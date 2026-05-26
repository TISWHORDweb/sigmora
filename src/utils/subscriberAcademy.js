/** Display name for the academy a subscriber joined */
export function getAcademyName(user) {
  return user?.creatorInfo?.creatorName || user?.creatorName || null;
}

export function getAcademyCode(user) {
  return user?.creatorInfo?.academyCode || user?.academyCode || null;
}

export function normalizeSubscriberUser(data) {
  if (!data || data.role !== 'subscriber') return data;
  const creatorInfo =
    data.creatorInfo ||
    (data.subscribedTo && (data.creatorName || data.academyCode)
      ? {
          _id: data.subscribedTo,
          creatorName: data.creatorName,
          academyCode: data.academyCode,
        }
      : null);
  return { ...data, creatorInfo };
}
