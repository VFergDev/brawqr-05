import Link from "next/link";

interface EditButtonProps {
  username: string;
}

export default function EditButton({ username }: EditButtonProps) {
  return (
    <Link
      href={`/p/${username}/edit`}
      style={{
        padding: "10px 15px",
        backgroundColor: "#0070f3",
        color: "white",
        borderRadius: "5px",
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      Edit Profile
    </Link>
  );
}
