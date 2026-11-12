import { MDXRemote } from "next-mdx-remote/rsc";

export function MdxBody({ source }: { source: string }) {
  return (
    <div className="prose-casa max-w-2xl text-[1.05rem] leading-8 text-[#2c2924]">
      <MDXRemote source={source} />
    </div>
  );
}
