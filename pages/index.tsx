import React from 'react'

import Rating from "@material-ui/lab/Rating";



export default function Index() {
   const [value, setValue] = React.useState<number | null>(2);
  return (
    <div className=" h-screen w-screen bg-gray-700">
      <div>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </div>
  );
}
