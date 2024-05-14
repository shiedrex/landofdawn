import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard, roles } from "./lib/interface";
import { client } from "./lib/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  try {
    const query = `
  *[_type == 'hero'] | order(order desc) {
    name,
    bio,
    "slug": slug.current,
    "imageUrl": image.asset->url,
  }`;

    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return null;
  }
}

async function getRoles() {
  try {
    const query = `
  *[_type == 'roles'] | order(_createdAt asc) {
    name,
  }`;

    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error("Error fetching roles from Sanity:", error);
    return null;
  }
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  const data2: roles[] = await getRoles();
  console.log(data);

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-6 mt-5 gap-5">
        {data2.map((role, index) => (
          <Link href={`/`} key={index} className="text-sm border-primary border text-center p-1 rounded-md hover:bg-primary hover:text-black">
            {role.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
        {data.map((item) => (
          <Card
            key={item._id}
            className="flex flex-col items-center text-center"
          >
            <Image
              src={item.imageUrl}
              alt="hero image"
              width={100}
              height={100}
              className="mt-6 rounded-full border-primary border-4"
            />
            <CardContent className="mt-2">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-xs">{item.bio}</p>
              <Button asChild className="w-full mt-3">
                <Link href={`/hero/${item.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
