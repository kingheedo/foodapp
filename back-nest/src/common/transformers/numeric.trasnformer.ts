export class ColumnNumericTransformer {
  // 데이터베이스에 저장할 때 (number → DB 저장)
  to(data: number): number {
    return data;
  }
  // 데이터베이스에서 읽어올 때 (DB → number 변환)
  from(data: string): number {
    return parseFloat(data);
  }
}
