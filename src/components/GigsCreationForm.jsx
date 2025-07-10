import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import API from "../utils/api";

const categories = [
  "Web Development",
  "UI/UX Design",
  "Video Editing",
  "Content Writing",
  "Graphic Design",
  "AI Services",
];

const GigsCreationForm = ({ open, onOpenChange, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !thumbnail
    ) {
      alert("Please fill in all fields including the thumbnail!");
      return;
    }
    console.log(formData.title, formData.description, formData.category, formData.price, thumbnail);
    

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("thumbnail", thumbnail);

      

      await API.post("/gigs/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Notify parent to refresh gigs
      onSaved?.();

      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
      });
      setThumbnail(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save gig. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Gig</DialogTitle>
          <DialogDescription>
            Showcase your service. Complete the details and save your gig.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Professional Website Development"
              className="col-span-3"
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your service in detail..."
              className="col-span-3"
              rows={4}
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="e.g., 100"
              className="col-span-3"
            />
          </div>

          {/* Thumbnail */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Thumbnail
            </Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Gig"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GigsCreationForm;
