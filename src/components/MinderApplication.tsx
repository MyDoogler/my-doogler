export interface MinderApplicationProps {
  id: string;
  message: string;
  status: string;
  dooglerId: string;
  minderId: string;
  minderEmail: string;
}

export const MinderApplication = ({
  status,
  minderEmail,
}: MinderApplicationProps) => {
  return (
    <tr>
      <td>
        <a href={`mailto:${minderEmail}`}>
          <button>📧</button>
        </a>
      </td>
      <td>{status}</td>
      <td>{minderEmail}</td>
    </tr>
  );
};
