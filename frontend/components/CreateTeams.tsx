import { useState } from "react";
import { Team } from "../types/types";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreateTeamForm = ({ 
    onSubmit, 
    onCancel 
}: { 
    onSubmit: (data: Partial<Team>) => void, 
    onCancel: () => void 
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Team Name</label>
                <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Create Team</Button>
            </div>
        </form>
    );
};

export default CreateTeamForm;