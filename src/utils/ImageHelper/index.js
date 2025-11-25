export const formatFileSize = bytes => {
  if (!bytes) return '';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export const getImageSource = (base64, fileType = 'image/jpeg') => {
  if (!base64) return null;
  const mime = fileType || 'image/jpeg';
  return {uri: `data:${mime};base64,${base64}`};
};

export const commonImageOptions = {
  mediaType: 'photo',
  quality: 0.7,
  maxWidth: 800,
  maxHeight: 800,
  includeBase64: true,
};

export const processImageResponse = response => {
  if (response?.didCancel) return null;

  if (response?.errorCode) {
    throw new Error(response.errorMessage || 'Gagal mengambil gambar');
  }

  if (response?.assets && response.assets.length > 0) {
    const asset = response.assets[0];

    if (!asset.base64) {
      throw new Error('Gagal mengkonversi gambar ke Base64');
    }

    return {
      uri: asset.uri,
      base64: asset.base64,
      fileName: asset.fileName || `image_${Date.now()}.jpg`,
      fileSize: asset.fileSize,
      type: asset.type || 'image/jpeg',
    };
  }

  return null;
};
