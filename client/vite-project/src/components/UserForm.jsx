import { useState } from "react";

function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    Education: "",
  });

  return (
    <div className="create-card">
      <div className="create-header">
        <h2>Create User</h2>
        <p>Add a new user to the system</p>
      </div>

      <div className="form-row">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <input
            placeholder="Education"
            value={form.Education}
            onChange={(e) =>
              setForm({ ...form, Education: e.target.value })
            }
          />

        <button className="create-btn" onClick={() => onSubmit(form)}>Create</button>
      </div>
    </div>
  );
}

export default UserForm;
