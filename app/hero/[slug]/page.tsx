import { article } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const revalidate = 30;

async function getData(slug: string) {
  try {
    const query = `
    *[_type == 'hero' && slug.current == '${slug}'] {
      name,
      bio,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      content,
      "roles": roles[]->{
        name,
        "imageUrl": image.asset->url
      }
    }[0]`;

    const data = await client.fetch(query);

    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return null;
  }
}

export default async function HeroArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: article = await getData(params.slug);
  console.log(data);

  return (
    <div className="mt-8">
      {data !== null ? (
        <div>
          <h1 className="block text-primary text-center font-bold tracking-wide uppercase text-sm md:text-md lg:text-lg xl:text-xl">
            Hero Spotlight
          </h1>
          <span className="block mt-2 text-center font-semibold tracking-tight text-sm md:text-md lg:text-lg xl:text-xl">
            {data.name}: {data.bio}
          </span>
          <Image
            src={data.imageUrl}
            alt="hero image"
            width={100}
            height={100}
            priority
            className="mt-6 rounded-full border-primary border-4"
          />
          <div className="mt-4 flex gap-2">
            {data.roles?.map((role, index) => (
              <div key={index}>
                <span className="rounded-md border-primary border p-2 flex gap-2 items-center text-sm tracking-tighter">
                  <Image
                    src={role.imageUrl}
                    width={20}
                    height={20}
                    alt="category image"
                    className="aspect-auto"
                  />
                  {role.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-16 prose prose-blue prose-sm md:prose-md lg:prose-lg xl:prose-xl prose-a:text-primary dark:prose-invert">
            <PortableText value={data.content} />
          </div>
        </div>
      ) : (
        <div>TBA</div>
      )}
    </div>
  );
}
