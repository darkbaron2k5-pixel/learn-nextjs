"use client"
import { useEffect, useState } from 'react';
import './userTable.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
}
interface Props {
    users: User[];
}
const UserTable = (props: Props) => {
    //cach 2: goi den api co cung domain thi khong bi loi cors 
    // const  [users, setUsers] = useState<User[]>([]);
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const res = await fetch ("/api/user");
    //         const data = await res.json();
    //         setUsers(data.data);
    //     }
    //     fetchUsers();
    // })
    const router = useRouter();
    const { users } = props;
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        });
        router.refresh();
    }

    const handleCreate = async () => {
        await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email})
        });
        router.refresh();
    }
    return (
        <>
            <div>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <button onClick={handleCreate}>Create</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => router.push(`/user/${user.id}`)}>View</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default UserTable;