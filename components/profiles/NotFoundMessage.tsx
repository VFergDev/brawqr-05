interface NotFoundMessageProps {
  username: string;
}

export default function NotFoundMessage({ username }: NotFoundMessageProps) {
  return (
    <div>
      <h2>User Not Found</h2>
      <p>No profile found for username: {username}</p>
      <p>This could mean:</p>
      <ul>
        <li>The username doesn&apos;t exist in the database</li>
        <li>There might be a typo in the URL</li>
      </ul>
    </div>
  );
}
