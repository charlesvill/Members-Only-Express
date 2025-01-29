function checkMembership(secret) {
  const member = secret === process.env.MEMBER_SECRET
    || secret === process.env.ADMIN_SECRET;
  const admin = member && secret === process.env.ADMIN_SECRET;

  return { member, admin};
}

module.exports = { checkMembership };
