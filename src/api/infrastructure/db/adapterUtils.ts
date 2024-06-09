export function adaptArrayDataBaseToDomain<TEntity>(entities: TEntity[]): TEntity[] {
  return entities.map(adaptDataBaseToDomain)
}

function adaptDataBaseToDomain<TEntity>(entity: TEntity): TEntity {
  if (entity === null || entity === undefined) {
    return entity
  }

  const result: Record<string, object> = {}
  Object.keys(entity).forEach((key: string) => {
    const newKey = getNewKeyDomain(key)
    result[newKey] = (entity as Record<string, object>)[key]
  })

  return result as TEntity
}

export function adaptDomainToDataBase<TEntity>(entity: TEntity): TEntity {
  if (entity === null || entity === undefined) {
    return entity
  }

  const result: Record<string, object> = {}
  Object.keys(entity).forEach((key: string) => {
    const newKey = getNewKeyDatabase(key)
    result[newKey] = (entity as Record<string, object>)[key]
  })

  return result as TEntity
}

function getNewKeyDatabase(propertyName: string): string {
  let newProperty: string = ''
  for (const char of propertyName) {
    if (isToUpperCase(char)) {
      newProperty += CHAR_UNDERSCORE
    } else {
      newProperty += char
    }
  }
  return newProperty
}

function isToUpperCase(letter: string): boolean {
  return letter.toUpperCase() === letter
}

function getNewKeyDomain(propertyName: string): string {
  let newProperty: string = ''
  let backCharIsUnderScore: string = ''

  for (const char of propertyName) {
    if (isToUnderscore(char)) {
      backCharIsUnderScore = char
    } else {
      if (isToUnderscore(backCharIsUnderScore)) {
        newProperty += char.toUpperCase()
        backCharIsUnderScore = ''
      } else {
        newProperty += char
      }
    }
  }

  return newProperty
}

const CHAR_UNDERSCORE = '_'
function isToUnderscore(letter: string): boolean {
  return CHAR_UNDERSCORE === letter
}
