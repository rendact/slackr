export default (userId, participants) => {
  /* 
 * ::params:: userId : current userId
 * ::params:: participants : the participant list edges object, expected memberType and node.id
 * ::return:: true if current userId is owner/admin, false otherwise
 */

  if (participants.length === 0 || !participants) {
    throw "Please add participants";
  }

  const admin = participants.find(p => p.memberType === "owner");

  if (!admin) {
    throw "no admin found";
  }

  return admin.node.id === userId;
};
