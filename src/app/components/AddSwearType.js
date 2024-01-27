import { SwearType } from "../model/SwearType";

export default function AddSwearType ({onAdd = () => {}}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async () => {
        // Validate the input fields
        if (!name || !description) {
            alert ("Please enter a name a description for the new swear type.");
            return;
        }
        // Create a new swear type object
        const query = {name, description};
        const newSwearType = await SwearType.createNewSwearType(query);
        onAdd(newSwearType);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            
        </Box>
    );
}