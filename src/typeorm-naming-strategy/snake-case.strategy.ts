import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm"

export class SnakeCaseStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public primaryKeyName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName
    let key = tableName.replace(".", "_")
    if (key.length >= 27) {
      key = this.getConsonantKey(key)
    }
    return "PK_" + key.substr(0, 27)
  }

  public uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const key = this.getKeyByTableAndColumns(tableOrName, columnNames)
    return "UQ_" + key.substr(0, 27)
  }

  public relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    let key = this.getKeyByTableAndColumns(tableOrName, columnNames, 26)
    if (where) {
      key += `_${where}`
    }
    return "REL_" + key.substr(0, 26)
  }

  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    const key = this.getKeyByTableAndColumns(tableOrName, columnNames)
    return "FK_" + key.substr(0, 27)
  }

  public indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    let key = this.getKeyByTableAndColumns(tableOrName, columnNames, 26)
    if (where) {
      key += `_${where}`
    }
    return "IDX_" + key.substr(0, 26)
  }

  private getKeyByTableAndColumns(
    tableOrName: Table | string,
    columnNames: string[],
    maxLength: number = 27,
  ): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace(".", "_")

    const clonedColumnNames: string[] = []
    columnNames.forEach((value) => {
      clonedColumnNames.push(value.replace("_id", ""))
    })
    clonedColumnNames.sort()
    let key = `${replacedTableName}_${clonedColumnNames.join("_")}`
    if (key.length <= maxLength) {
      return key
    }
    key = this.getConsonantKey(key)
    return key
  }

  private getConsonantKey(key: string): string {
    return key
      .split("_")
      .map((el) => el[0] + el.substr(1).replace(/[aeijouy]/g, ""))
      .join("_")
  }
}
