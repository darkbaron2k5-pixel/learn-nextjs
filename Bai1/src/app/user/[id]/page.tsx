import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: Promise<{id: string}>,
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

type User = {
    id: number,
    name: string,
    email: string
}

export const generateMetadata = async ({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> => {
    const id = (await params).id;
    const res = await fetch(`http://localhost:8000/users/${id}`);
    const user = await res.json();
    
    return {
        title: user.name,
        description: `This is the page of user ${user.email}`,
    }
}

export const generateStaticParams = async () => {
    const res = await fetch(`http://localhost:8000/users`);
    const users = await res.json();

    return users.map((user: User) => (
        {id: user.id.toString()}
    ));
}

const UserDetail = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    return (
        <>
            <div>User detail : {id}</div>
        </>
    )
}
export default UserDetail;