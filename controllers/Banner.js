const Banner = require('../models/Banner');


// Add a new banner
exports.addBanner = async (req, res) => {
  try {
    const { title, description, status, createdby, } = req.body;
    

    const newBanner = new Banner({ title, description, image:req.file ? req.file.path : null
        , status, createdby, });
    await newBanner.save();

    res.status(201).json({ message: 'Banner added successfully', banner: newBanner });
  } catch (error) {
    res.status(500).json({ message: 'Error adding banner', error });
  }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error });
  }
};

exports.getBannerByUserId = async (req, res) => {

    try {
        const id = req.params.id;
        const role = await Banner.find({createdby:id});
        if (!role) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Banner', error: error.message });
    }
};
// Update a banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const image = req.file ? req.file.path : null;
    let updatedFields = { title, description, status };

    if (image) {
        updatedFields.image = image;
      }
    

    const updatedBanner = await Banner.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
  } catch (error) {
    res.status(500).json({ message: 'Error updating banner', error });
  }
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
   const banner= await Banner.findByIdAndDelete(id);

   if (! banner) {
    return res.status(404).json({ message: 'Banner not found' });
  }

   

    res.status(200).json({ message: 'Banner deleted successfully',banner });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting banner', error });
  }
};


exports.getBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id)
    if (!banner) {
      return res.status(404).json({ message: 'banner not found' });
    }

    res.status(200).json({ banner });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client', details: error.message });
  }
};