# Matomo Resuable Responsive Table

This table is a project by Shelby Ludlow to show a responsive reusable table using javascript and css, without use of any other styling or table libraries/components.

## Testing
To test the table, simply open the `index.html` file in the root folder. The table will render with the test data provided. To change the data displayed in the table and test different outputs, press the button under 'Upload test data in JSON' to upload a JSON file. The project files include a 'testdata.json' which can be uploaded to use for testing.

## Assumptions
We assume the data provided will be in the same format as the test data. i.e it will be a JSON object with the 'data' property of an array, each with the 'dimension' and 'metrics' properties. The example below shows expectations.

`{
  "data": [
    {
      "dimension": {
        "device": "Desktop",
        "browser": "Chrome"
      },
      "metrics": [
        {
          "title": "Visits",
          "value": 12345,
          "trend": "+15%"
        }
      ]
    }
]}`

## Implementation
To use this in an application, you would need to use the `responsiveTable.js` and `responsiveTable.css` files in your project, as demonstrated in the `index.html` file. The table component looks for a div with the id `#table-root` to create the base table in. The root component should have no children (they will get wiped). This implementation is also using an input file button to get data, and this will have to be updated to be a 'real' source of data, but was kept simple for testing purposes in this component.

Once adjusted, this component could be used in a larger application to display data in a table. It stretches to fill its parent container and scrolls, so can be styled/formatted appropriately.

## Limitations
This table component does not filter, sort, or paginate data. Data comes from within the components input file button, not an external source.
