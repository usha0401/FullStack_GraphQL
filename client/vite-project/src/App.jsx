// import { gql } from "@apollo/client";
// import { useQuery, useMutation } from "@apollo/client/react";
// import { useState } from "react";
// import Header from "./components/Header";
// import UserList from "./components/UserList";
// import UserForm from "./components/UserForm";


// /* ---------------- QUERIES ---------------- */

// const GET_USERS = gql`
//   query GetUsers {
//     getUsers {
//       id
//       name
//       age
//       isMarried
//       Education
//     }
//   }
// `;

// const GET_USER_BY_ID = gql`
//   query GetUserById($id: ID!) {
//     getUserById(id: $id) {
//       id
//       name
//       age
//       isMarried
//       Education
//     }
//   }
// `;

// /* --------------- MUTATION --------------- */

// const CREATE_USER = gql`
//   mutation CreateUser($name: String!, $age: Int!,$Education: String!, $isMarried: Boolean!) {
//     createUser(name: $name, age: $age, Education:$Education, isMarried: $isMarried) {
//       id
//       name
//     }
//   }
// `;

// function App() {
//   const [newUser, setNewUser] = useState({
//     name: "",
//     age: "",
//     Education: "",

//   });

//   /* ---- GET ALL USERS ---- */
//   const {
//     data: usersData,
//     loading: usersLoading,
//     error: usersError,
//   } = useQuery(GET_USERS);

//   /* ---- GET USER BY ID ---- */
//   const {
//     data: userByIdData,
//     loading: userByIdLoading,
//   } = useQuery(GET_USER_BY_ID, {
//     variables: { id: "2" },
//   });

//   /* ---- CREATE USER ---- */
//   const [createUser] = useMutation(CREATE_USER, {
//     refetchQueries: [GET_USERS], // refresh list after creation
//   });

//   if (usersLoading) return <p>Loading users...</p>;
//   if (usersError) return <p>Error: {usersError.message}</p>;

//   const handleCreateUser = async () => {
//     await createUser({
//       variables: {
//         name: newUser.name,
//         age: Number(newUser.age),
//         Education: newUser.Education,
//         isMarried: false,
//       },
//     });

//     setNewUser({ name: "", age: "",Education: ""  });
//   };

//   return (
//     <div>
//       {/* CREATE USER */}
//       <h2>Create User</h2>
//       <input
//         placeholder="Name"
//         value={newUser.name}
//         onChange={(e) =>
//           setNewUser((prev) => ({ ...prev, name: e.target.value }))
//         }
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={newUser.age}
//         onChange={(e) =>
//           setNewUser((prev) => ({ ...prev, age: e.target.value }))
//         }
//       />
//       <input
//       placeholder="Education"
//       value={newUser.Education}
//       onChange={(e) =>
//         setNewUser((prev) => ({ ...prev, Education: e.target.value }))
//       }
//     />

//       <button onClick={handleCreateUser}>Create</button>

//       <hr />

//       {/* USER BY ID */}
//       <h2>Chosen User (ID = 2)</h2>
//       {userByIdLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <p>Name: {userByIdData.getUserById.name}</p>
//           <p>Age: {userByIdData.getUserById.age}</p>
//         </>
//       )}

//       <hr />

//       {/* ALL USERS */}
//       <h2>All Users</h2>
//       {usersData.getUsers.map((user) => (
//         <div key={user.id}>
//           <p>Name: {user.name}</p>
//           <p>Age: {user.age}</p>
//           <p>Married: {user.isMarried ? "Yes" : "No"}</p>
//           <p>Education:{user.Education}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import "./App.css";

import { useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

/* ---------------- GraphQL ---------------- */

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      Education
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $age: Int!
    $Education: String!
    $isMarried: Boolean!
  ) {
    createUser(
      name: $name
      age: $age
      Education: $Education
      isMarried: $isMarried
    ) {
      id
      name
      age
      Education
    }
  }
`;

function App() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(GET_USERS);

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS],
  });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateUser = async (formData) => {
    await createUser({
      variables: {
        ...formData,
        age: Number(formData.age),
        isMarried: false,
      },
    });
  };

  /* ✅ YOU WERE MISSING THIS */
  return (
  <div className="page">
    <div className="container">

      <Header search={search} setSearch={setSearch} />

      <UserForm onSubmit={handleCreateUser} />

      <UserList users={data.getUsers} search={search} />
    </div>
  </div>
);

}

export default App;
