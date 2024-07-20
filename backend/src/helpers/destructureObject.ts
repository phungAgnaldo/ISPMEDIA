export function destructureObject(obj: any) {
    const [
      {
        fieldname: urlFieldName,
        originalname: urlOriginalName,
        encoding: urlEncoding,
        mimetype: urlMimetype,
        destination: urlDestination,
        filename: urlFilename,
        path: urlPath,
        size: urlSize,
      },
    ] = obj.url;
  
    const [
      {
        fieldname: coverUrlFieldName,
        originalname: coverUrlOriginalName,
        encoding: coverUrlEncoding,
        mimetype: coverUrlMimetype,
        destination: coverUrlDestination,
        filename: coverUrlFilename,
        path: coverUrlPath,
        size: coverUrlSize,
      },
    ] = obj.cover_url;
  
    return {
      url: {
        fieldname: urlFieldName,
        originalname: urlOriginalName,
        encoding: urlEncoding,
        mimetype: urlMimetype,
        destination: urlDestination,
        filename: urlFilename,
        path: urlPath,
        size: urlSize,
      },
      cover_url: {
        fieldname: coverUrlFieldName,
        originalname: coverUrlOriginalName,
        encoding: coverUrlEncoding,
        mimetype: coverUrlMimetype,
        destination: coverUrlDestination,
        filename: coverUrlFilename,
        path: coverUrlPath,
        size: coverUrlSize,
      },
    };
  }