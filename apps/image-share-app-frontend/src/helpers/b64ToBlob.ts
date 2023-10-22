export const b64ToBlob = (b64Data: string) => {
  const sliceSize = 512;
  const splittedB64Data = b64Data?.split(';base64,');
  const contentType = splittedB64Data?.[0]?.split('data:')?.[1];
  const data = splittedB64Data?.[1];

  const byteCharacters = atob(data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters?.length; offset += sliceSize) {
    const slice = byteCharacters?.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice?.length);
    for (let i = 0; i < slice?.length; i += 1) {
      byteNumbers[i] = slice?.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays?.push(byteArray);
  }

  const blob = new Blob(byteArrays, {
    type: contentType,
  });

  return blob;
};
