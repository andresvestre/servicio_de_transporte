export function adaptEntityDomainToView<TTarget>(entity: unknown, View: new () => TTarget): TTarget | undefined {
  if (View === null || View === undefined) {
    return undefined
  }

  const view = createNewInstance(View)
  const viewFilled = extractValuesDomain<TTarget>(entity, view)

  return viewFilled
}

function createNewInstance<TTarget>(View: new () => TTarget): TTarget {
  return new View()
}

function extractValuesDomain<TTarget>(domain: unknown, view: TTarget): TTarget {
  Object.keys(view as object)
    .forEach((key: string) => {
      (view as Record<string, object>)[key] = (domain as Record<string, object>)[key]
    })

  return view
}
