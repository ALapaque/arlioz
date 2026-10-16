interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Server-rendered schema.org JSON-LD. `<` is escaped so the payload can never close the tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
