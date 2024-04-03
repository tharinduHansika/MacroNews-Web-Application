const express = require('express');
const router = express.Router();
const News = require('../models/news');
const validateToken = require('../middleware');
const Image = require('../models/image')

// add
router.post('/', validateToken, async (req, res) => {
    try {
        // Extract image data from request
        const imageData = req.body.image;
        // image data should be an object --> { data, name, contentType }
        // data --> base64 string

        imageData.data = Buffer.from(imageData.data, 'base64');

        // Create a new image document
        const image = await Image.create(imageData);

        // Create a new news item with image ID
        const newsData = {
            title: req.body.title,
            category: req.body.category,
            status: req.body.status,
            description: req.body.description,
            image: image._id // Set the image ID in news
        };

        // Save the news item
        const news = await News.create(newsData);

        // Return the saved news item
        res.json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/many', validateToken, async (req, res) => {
    try {
        const { list } = req.body;

        // Create an array to store promises for image creation
        const imagePromises = [];

        // Iterate over each item in the list
        for (const item of list) {
            // Extract image data from item
            const imageData = item.image;
            // Convert base64 data to buffer
            imageData.data = Buffer.from(imageData.data, 'base64');
            // Push the promise for image creation to the array
            imagePromises.push(Image.create(imageData));
        }

        // Wait for all image creation promises to resolve
        const images = await Promise.all(imagePromises);

        // Create an array to store news data with image IDs
        const newsDataList = list.map((item, index) => ({
            title: item.title,
            category: item.category,
            status: item.status,
            description: item.description,
            image: images[index]._id // Set the image ID in news
        }));

        // Insert news items in batch
        await News.insertMany(newsDataList);

        res.status(200).json({
            message: "News added"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// get all active
router.get('/all', async (req, res) => {
    try {
        const list = await News.find({ active: true }).populate('image');
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// latest
router.get('/latest', async (req, res) => {
    try {
        // Fetch the top 5 latest news items sorted by date and time
        const latestNews = await News.find({}).sort({ date: -1 }).limit(5).populate('image');

        res.status(200).json(latestNews);
    } catch (error) {
        console.error('Error fetching latest news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get by id
router.post('/byIds', async (req, res) => {
    try {
        const { ids } = req.body;

        console.log(req.body);

        if (!ids) {
            return res.status(400).json({ error: 'Invalid request, missing IDs' });
        }

        const items = await News.find({ _id: { $in: ids } }).populate('image');

        res.json({ items });
    } catch (error) {
        console.error('Error fetching items by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get all news with the images
router.get('/', async (req, res) => {
    try {
        console.log(req.query);
        const item = await News.find(req.query)
            .populate('image')

        console.log(item);
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'News not found' });
    }
});

// update by id
router.post('/update/:_id', validateToken, async (req, res) => {
    try {
        const { _id } = req.params;

        // Check if image is included in the request body
        if (req.body.image) {

            const imageData = req.body.image;
            // image data should be an object --> { data, name, contentType }
            // data --> base64 string

            imageData.data = Buffer.from(imageData.data, 'base64');

            // Create a new image document
            const image = await Image.create(imageData);
            // Update the news item with the new image buffer
            const updatedItem = await News.findByIdAndUpdate(_id, { ...req.body, image }, { new: true });
            res.json(updatedItem);
        } else {
            // Update the news item with other fields
            const updatedItem = await News.findByIdAndUpdate(_id, req.body, { new: true });
            res.json(updatedItem);
        }
    } catch (error) {
        res.status(404).json({ error: 'News not found' });
    }
});

// delete by id
router.post('/delete/:_id', validateToken, async (req, res) => {
    try {
        await News.findOneAndUpdate(
            { _id: req.params._id, active: false },
            { $set: { active: true } }
        );
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: 'Item not found' });
    }
});

// Filter News by category
router.get('/filter/by-category/:category', async (req, res) => {
    try {
        const items = await News.find({ category: req.params.category });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Filter News by category
router.get('/filter/by-status/:status', async (req, res) => {
    try {
        const items = await News.find({ status: req.params.status });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get the category count
router.get('/category-count', async (req, res) => {
    try {
        const categoryCounts = await News.aggregate([
            { $match: { active: true } }, // Filter active news
            { $group: { _id: "$category", count: { $sum: 1 } } }, // Group by category and count
        ]);

        const categoryCountMap = {};
        categoryCounts.forEach(category => {
            categoryCountMap[category._id] = category.count;
        });

        res.json(categoryCountMap);
    } catch (err) {
        console.error("Error while fetching category counts:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
