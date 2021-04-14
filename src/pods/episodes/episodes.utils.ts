export const pageSize = 12;

export interface ServerPagesCalculation {
  dataPage1: number;
  dataPage2: number;
  pos11: number;
  pos12: number;
  pos21?: number;
  pos22?: number;
}

export const calculateServerPages = (
  page: number,
  totalChars?: number
): ServerPagesCalculation => {
  const serverPageSize = parseInt(process.env.SERVER_PAGE_SIZE);
  const serverPagesCalculation: ServerPagesCalculation = {
    dataPage1: 0,
    dataPage2: 0,
    pos11: 0,
    pos12: 0,
    pos21: 0,
    pos22: 0,
  };
  serverPagesCalculation.dataPage1 = Math.ceil(
    ((page - 1) * pageSize + 1) / serverPageSize
  );

  if (
    totalChars &&
    serverPagesCalculation.dataPage1 === Math.ceil(totalChars / serverPageSize)
  ) {
    serverPagesCalculation.dataPage2 = serverPagesCalculation.dataPage1;
  } else {
    serverPagesCalculation.dataPage2 = Math.ceil(
      (page * pageSize) / serverPageSize
    );
  }

  if (serverPagesCalculation.dataPage1 === serverPagesCalculation.dataPage2) {
    serverPagesCalculation.pos11 = ((page - 1) * pageSize) % serverPageSize;
    if (totalChars && totalChars < page * pageSize) {
      serverPagesCalculation.pos12 = serverPageSize;
    } else {
      serverPagesCalculation.pos12 =
        (page * pageSize) % serverPageSize !== 0
          ? (page * pageSize) % serverPageSize
          : serverPageSize;
    }
  } else {
    serverPagesCalculation.pos11 = ((page - 1) * pageSize) % serverPageSize;
    serverPagesCalculation.pos12 = serverPageSize;
    serverPagesCalculation.pos21 = 0;
    serverPagesCalculation.pos22 =
      (page * pageSize) % serverPageSize !== 0
        ? (page * pageSize) % serverPageSize
        : serverPageSize;
  }
  return serverPagesCalculation;
};
