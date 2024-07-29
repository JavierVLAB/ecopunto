import Image from "next/image";
import Link from "next/link";
import "../ui/globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font_h1"> H1 Monserrat 32 Black</h1>
      <h2 className="font_h2"> titulo 2 h2</h2>
      <h3 className="font_h3"> titulo 3 h3</h3>
      <p className="font_body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vestibulum varius mauris, nec accumsan sapien consequat quis. </p>
      <p className="font_body_secundary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vestibulum varius mauris, nec accumsan sapien consequat quis. </p>
      <p className="font_caption">caption</p>
      <p className="font_label">Lorem ipsum dolor sit amet,</p>
    </main>
  );
}
