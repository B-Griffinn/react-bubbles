import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log('What is colorToEdit at this moment? ', colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is id saved right now? *** id is saved in BubblePage as state and is being passed down as props

    // updateColors is a setStae fn being passed in from BubblePage
      // map through that colors arr of object that is also passed in from BubblePage
    updateColors(
      colors.map(color => {
        if (color.id === colorToEdit.id) {
          return colorToEdit;
        } else {
          return color;
        }
      })
    );
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("The edited color is: ", res);
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
// create a new arr and test the color the user attempts to delete
console.log('THIS COLOR WAS DELETED', color)
    updateColors(colors.filter(item => item.id !== color.id));
    // if item.id === color.id we would delete everything BUT the selected delete button

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <button className="delete" onClick={() => deleteColor(color)}>
                Delete
              </button>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
