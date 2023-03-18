interface Props {
  title: string;
}

export default function Title({ title }: Props) {
  return (
    <div class="ml-16 relative lg:w-full lg:max-w-lg lg:mx-auto">
      <div class="w-full h-1 bg-secondary -translate-y-1/2 absolute top-1/2 -left-[calc(100%+0.5rem)] lg:-left-[calc(100%+1.5rem)]">
      </div>

      <h2 class="text-secondary text-2xl font-black italic tracking-widest uppercase relative lg:text-3xl">
        <span class="text-white text-shadow absolute top-0.5 left-0.5 -z-10">
          {title}
        </span>
        {title}
      </h2>
    </div>
  );
}
