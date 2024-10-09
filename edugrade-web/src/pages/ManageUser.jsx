import { Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Name", "Email", "Mobile", "Role", "Action"];
export const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState("");

  console.log(users);

  const getUsers = async () => {
    await axios
      .get("http://localhost:8000/api/user/allProfiles")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userFiltered = users.filter((oneUser) => {
    return oneUser.name.toLowerCase().includes(filterUser.toLowerCase());
  });

  const deleteUser = async (id) => {
    try {
      await axios
        .delete("http://localhost:8000/api/user/${id}")
        .then((res) => {
          if (res.status === 200) {
            const filterUser = users.filter((Obj) => Obj._id !== id);
            setUsers(filterUser);
          }
        })
        .catch((err) => {
          console.log("error deleting user");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full w-full overflow-scroll p-4">
      <Typography className="font-bold text-xl mb-4">
        User management
      </Typography>
      <Input
        type="text"
        label="Search Users here"
        value={filterUser}
        onChange={(e) => setFilterUser(e.target.value)}
      />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left mt-4">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userFiltered.map(({ name, email, mobile, role, _id }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {mobile}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {role}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium cursor-pointe text-neutral-950"
                    >
                      <Trash2 color="red" onClick={() => deleteUser(_id)} />
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
