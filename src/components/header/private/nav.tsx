import { logout } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { useEffect, useState, type SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { fetchMenu, type MenuItem } from "../../../services/menuApi";
//import { useAuth } from "../../../auth/AuthContext";

/** Menu item contract */
// interface MenuItem {
//   id: number;
//   label: string;
//   url: string;
// }

//   const Nav = () => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch menu");
//         }
//         return res.json();
//       })
//       .then((data: any[]) => {
//         // Map API response to menu structure
//         const mappedMenu: MenuItem[] = data.slice(0, 4).map((item) => ({
//           id: item.id,
//           label: item.name,
//           url: "#"
//         }));

//         setMenuItems(mappedMenu);
//         setLoading(false);
//       })
//       .catch((err: Error) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading menu...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <>
//       <nav>
//         <ul className="nav">
//             {menuItems.map((item) => (
//             <li className="nav-item" key={item.id}>
//                 <a className="nav-link" href={item.url}>
//                 {item.label}
//                 </a>
//             </li>
//             ))}
//         </ul>
//         </nav>
//     </>
//   )
// }

const Nav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const { logout } = useAuth();

  useEffect(() => {
    fetchMenu()
      .then((data: SetStateAction<MenuItem[]>) => {
        setMenu(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load menu");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="px-3">Loading menu...</p>;
  if (error) return <p className="text-danger px-3">{error}</p>;
  console.log("logout action:", logout);

  return (
    <nav className="navbar navbar-expand px-3 py-0">
      <ul className="navbar-nav">
        {menu.map((item) => (
          <li className="nav-item" key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold" : ""}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </nav>
  );
};

export default Nav