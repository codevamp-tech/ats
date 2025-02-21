import Company from '../../models/company.js';

const addCompany = async (req, res) => {
    try {
        const { CompanyUserName, address, email, name, phone, website } = req.body;

        // Check if email already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const existingCompanyUserName = await Company.findOne({ CompanyUserName });
        if (existingCompanyUserName) {
            return res.status(409).json({ message: "Company Unique Name already registered." });
        }

        // Create new Company
        const newCompany = new Company({
            CompanyUserName, address, email, name, phone, website
        });

        await newCompany.save();

        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addCompany };
