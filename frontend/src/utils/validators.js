export const validateIP = (ip) => {
  const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipPattern.test(ip);
};

export const checkCertExpiry = (servers) => {
  const now = new Date();
  const warningDate = new Date();
  warningDate.setDate(warningDate.getDate() + 15);
  
  return servers.filter(server => {
    return server.certExpiry && new Date(server.certExpiry) <= warningDate;
  });
};

export const sendExpiryNotification = async (servers) => {
  const expiringServers = checkCertExpiry(servers);
  
  if (expiringServers.length > 0) {
    // Implementar lógica de envío de correo
    console.log('Enviando notificaciones por certificados próximos a vencer');
  }
};