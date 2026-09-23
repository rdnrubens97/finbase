import { useCallback, useEffect, useState } from 'react'

/**
 * Persistência em localStorage.
 *
 * Toda leitura e escrita é protegida: em janela anônima, com dados de site
 * bloqueados ou sem espaço, o acesso lança exceção. O app precisa continuar
 * funcionando nesse caso, só sem lembrar nada.
 */
export function useLocalStorage<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const bruto = localStorage.getItem(chave)
      return bruto ? (JSON.parse(bruto) as T) : inicial
    } catch {
      return inicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      /* sem espaço ou acesso negado — segue sem persistir */
    }
  }, [chave, valor])

  const limpar = useCallback(() => {
    try {
      localStorage.removeItem(chave)
    } catch {
      /* ignora */
    }
    setValor(inicial)
  }, [chave, inicial])

  return [valor, setValor, limpar] as const
}
