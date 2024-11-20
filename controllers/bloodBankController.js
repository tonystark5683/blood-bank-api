const bloodBankEntries = [
    {
        id: 1,
        donorName: "John Doe",
        age: 25,
        bloodType: "O+",
        contactInfo: "john.doe@example.com",
        quantity: 2,
        collectionDate: "2024-11-01",
        expirationDate: "2024-11-30",
        status: "Available",
    },
    {
        id: 2,
        donorName: "Jane Smith",
        age: 30,
        bloodType: "A+",
        contactInfo: "jane.smith@example.com",
        quantity: 3,
        collectionDate: "2024-11-10",
        expirationDate: "2024-12-05",
        status: "Requested",
    },
    {
        id: 3,
        donorName: "Robert Brown",
        age: 45,
        bloodType: "B-",
        contactInfo: "robert.brown@example.com",
        quantity: 1,
        collectionDate: "2024-11-05",
        expirationDate: "2024-11-25",
        status: "Expired",
    },
    {
        id: 4,
        donorName: "Emily Davis",
        age: 35,
        bloodType: "O-",
        contactInfo: "emily.davis@example.com",
        quantity: 2,
        collectionDate: "2024-11-15",
        expirationDate: "2024-12-10",
        status: "Available",
    },
    {
        id: 5,
        donorName: "Michael Wilson",
        age: 40,
        bloodType: "B+",
        contactInfo: "michael.wilson@example.com",
        quantity: 4,
        collectionDate: "2024-11-12",
        expirationDate: "2024-11-30",
        status: "Requested",
    },
    {
        id: 6,
        donorName: "Sophia Miller",
        age: 29,
        bloodType: "A-",
        contactInfo: "sophia.miller@example.com",
        quantity: 3,
        collectionDate: "2024-11-07",
        expirationDate: "2024-11-25",
        status: "Expired",
    },
    {
        id: 7,
        donorName: "William Johnson",
        age: 33,
        bloodType: "AB+",
        contactInfo: "william.johnson@example.com",
        quantity: 5,
        collectionDate: "2024-11-09",
        expirationDate: "2024-11-29",
        status: "Available",
    },
    {
        id: 8,
        donorName: "Olivia Taylor",
        age: 27,
        bloodType: "AB-",
        contactInfo: "olivia.taylor@example.com",
        quantity: 1,
        collectionDate: "2024-11-08",
        expirationDate: "2024-11-28",
        status: "Requested",
    },
];




const handleError = (res, message, statusCode = 400) => {
    res.status(statusCode).json({ error: message });
};


exports.createEntry = (req, res) => {
    try {
        const { donorName, age, bloodType, contactInfo, quantity, collectionDate, expirationDate, status } = req.body;

        // Validate fields
        if (!donorName || !age || !bloodType || !contactInfo || !quantity || !collectionDate || !expirationDate || !status) {
            return handleError(res, "All fields are required.");
        }
        if (typeof donorName !== "string" || donorName.trim() === "") {
            return handleError(res, "Invalid donor name.");
        }
        if (typeof age !== "number" || age <= 0 || age > 100) {
            return handleError(res, "Age must be a number between 1 and 100.");
        }
        if (!["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(bloodType)) {
            return handleError(res, "Invalid blood type.");
        }
        if (typeof quantity !== "number" || quantity <= 0) {
            return handleError(res, "Quantity must be a positive number.");
        }
        if (new Date(collectionDate) > new Date(expirationDate)) {
            return handleError(res, "Collection date cannot be after expiration date.");
        }
        if (!["Available", "Requested", "Expired"].includes(status)) {
            return handleError(res, "Status must be one of 'Available', 'Requested', or 'Expired'.");
        }

        const newEntry = {
            id: bloodBankEntries.length + 1,
            donorName,
            age,
            bloodType,
            contactInfo,
            quantity,
            collectionDate,
            expirationDate,
            status,
        };
        bloodBankEntries.push(newEntry);
        res.status(201).json(newEntry);
    } catch (error) {
        handleError(res, "An error occurred while creating the entry.", 500);
    }
};


exports.getAllEntries = (req, res) => {
    try {
        res.json(bloodBankEntries);
    } catch (error) {
        handleError(res, "An error occurred while fetching the entries.", 500);
    }
};


exports.getEntryById = (req, res) => {
    try {
        const { id } = req.params;
        const entry = bloodBankEntries.find(e => e.id === parseInt(id));
        if (!entry) return handleError(res, "Entry not found.", 404);
        res.json(entry);
    } catch (error) {
        handleError(res, "An error occurred while fetching the entry.", 500);
    }
};


exports.updateEntry = (req, res) => {
    try {
        const { id } = req.params;
        const entry = bloodBankEntries.find(e => e.id === parseInt(id));
        if (!entry) return handleError(res, "Entry not found.", 404);

        const updates = req.body;

        // Validate updates
        if (updates.age && (typeof updates.age !== "number" || updates.age <= 0 || updates.age > 100)) {
            return handleError(res, "Age must be a number between 1 and 100.");
        }
        if (updates.bloodType && !["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(updates.bloodType)) {
            return handleError(res, "Invalid blood type.");
        }
        if (updates.quantity && (typeof updates.quantity !== "number" || updates.quantity <= 0)) {
            return handleError(res, "Quantity must be a positive number.");
        }
        if (updates.collectionDate && updates.expirationDate && new Date(updates.collectionDate) > new Date(updates.expirationDate)) {
            return handleError(res, "Collection date cannot be after expiration date.");
        }
        if (updates.status && !["Available", "Requested", "Expired"].includes(updates.status)) {
            return handleError(res, "Invalid status.");
        }

        Object.assign(entry, updates);
        res.json(entry);
    } catch (error) {
        handleError(res, "An error occurred while updating the entry.", 500);
    }
};


exports.deleteEntry = (req, res) => {
    try {
        const { id } = req.params;
        const index = bloodBankEntries.findIndex(e => e.id === parseInt(id));
        if (index === -1) return handleError(res, "Entry not found.", 404);

        bloodBankEntries.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        handleError(res, "An error occurred while deleting the entry.", 500);
    }
};



exports.getPaginatedEntries = (req, res) => {
    try {

        const page = parseInt(req.params.page) || 1; 
        const size = parseInt(req.params.size) || 2; 

        // Validate page and size
        if (page < 1 || size < 1) {
            return res.status(400).json({ message: "Page and size must be positive integers." });
        }


        const offset = (page - 1) * size;


        const totalEntries = bloodBankEntries.length;


        if (offset >= totalEntries && totalEntries > 0) {
            return res.status(404).json({ message: "Page exceeds available entries." });
        }


        const paginatedData = bloodBankEntries.slice(offset, offset + size);

        // Return paginated response
        res.status(200).json({
            page,
            size,
            totalEntries,
            totalPages: Math.ceil(totalEntries / size),
            data: paginatedData,
        });
    } catch (error) {

        console.error("Error fetching blood bank entries:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


exports.searchEntries = (req, res) => {
    try {
        const { bloodType, status, donorName } = req.params;
        let filteredEntries = bloodBankEntries;

        // Validate blood type
        if (bloodType) {
            if (!["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(bloodType)) {
                return handleError(res, "Invalid blood type.");
            }
            filteredEntries = filteredEntries.filter(e => e.bloodType === bloodType);
        }

        // Validate status
        if (status) {
            if (!["Available", "Requested", "Expired"].includes(status)) {
                return handleError(res, "Invalid status.");
            }
            filteredEntries = filteredEntries.filter(e => e.status === status);
        }

        if (donorName) {
            filteredEntries = filteredEntries.filter(e => e.donorName.toLowerCase().includes(donorName.toLowerCase()));
        }

        res.json(filteredEntries);
    } catch (error) {
        handleError(res, "An error occurred while searching for entries.", 500);
    }
};
