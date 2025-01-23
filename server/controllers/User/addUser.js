import User from '../../models/User.js';

const addUser = async (req, res) => {
    try {
        const { userName, email, password, gender, address, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered." });
        }

        // Validate role field against allowed enum values
        const allowedRoles = ["admin", "recruiter_manager", "hiring_manager", "interviewer", "candidate"];
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified." });
        }

        // Create new user
        const newUser = new User({
            userName,
            email,
            password,
            gender,
            address,
            role: role || "candidate",
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addUser };
