import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const FilterSidebar = () => {
  return (
    <div className="w-full sm:w-1/4 py-4 bg-white border rounded-md">
      <h2 className="text-lg font-semibold mb-4 mx-4">Filters</h2>
      <hr />
      <div className="mb-4 mx-4">
        <h3 className="font-medium">Price Range</h3>
        <Input type="text" placeholder="Min" className="w-full mt-2" />
        <Input type="text" placeholder="Max" className="w-full mt-2" />
      </div>
      <div className="mb-4  mx-4">
        <h3 className="font-medium">Amenities</h3>
        
        <Label><Checkbox className="mt-2" /> Free WiFi</Label><br />
        
        <Label><Checkbox className="mt-2"/> Swimming Pool</Label><br />
        
        <Label><Checkbox className="mt-2" /> Parking</Label><br />

      </div>
      <div className="mb-4 mx-4">
      <Label><Checkbox className="mt-2" /> Free WiFi</Label><br />
        
        <Label><Checkbox className="mt-2"/> Swimming Pool</Label><br />
        
        <Label><Checkbox className="mt-2" /> Parking</Label><br />

      </div>
    </div>
  );
};

export default FilterSidebar;
