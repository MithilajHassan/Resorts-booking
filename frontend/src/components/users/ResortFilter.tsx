import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const FilterSidebar = () => {
  return (
    <div className="w-full sm:w-1/4 py-4 bg-white border rounded-md h-full ml-2">
      <h2 className="text-lg font-semibold mb-4 mx-4">Filters</h2>
      <hr className="mb-3" />
      <div className="mb-4 mx-4">
        <h3 className="font-medium">Price Range</h3>
        <Input type="text" placeholder="Min" className="w-full mt-2" />
        <Input type="text" placeholder="Max" className="w-full mt-2" />
      </div>
      <hr className="my-3" />
      <div className="mb-4 mx-4">
        <h3 className="font-medium">Amenities</h3>
        <Label><Checkbox className="mt-2" /> Free WiFi</Label><br />
        <Label><Checkbox className="mt-2" /> Swimming Pool</Label><br />
        <Label><Checkbox className="mt-2" /> Parking</Label><br />
      </div>
      <hr className="my-3" />
      <div className="mb-4 mx-4">
        <h3 className="font-medium">Categories</h3>
        <Label><Checkbox className="mt-2" /> Beach Resort</Label><br />
        <Label><Checkbox className="mt-2" /> Mountain Resort</Label><br />
        <Label><Checkbox className="mt-2" /> Jungle Resort</Label><br />
      </div>
    </div>
  );
};

export default FilterSidebar;
