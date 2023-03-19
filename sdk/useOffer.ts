import type { AggregateOffer, UnitPriceSpecification } from 'deco-sites/std/commerce/types.ts'

const bestInstallment = (
	acc: UnitPriceSpecification | null,
	curr: UnitPriceSpecification,
) => {
	if (curr.priceComponentType !== 'https://schema.org/Installment') {
		return acc
	}

	if (!acc) {
		return curr
	}

	if (acc.price > curr.price) {
		return curr
	}

	if (acc.price < curr.price) {
		return acc
	}

	if (
		acc.billingDuration && curr.billingDuration &&
		acc.billingDuration < curr.billingDuration
	) {
		return curr
	}

	return acc
}

const installmentToString = (
	installment: UnitPriceSpecification,
) => {
	const { billingDuration, billingIncrement } = installment

	if (!billingDuration || !billingIncrement) {
		return ''
	}

	return `${billingDuration}x de R$ ${billingIncrement}`
}

const fullInstallmentToString = (
	installment: UnitPriceSpecification,
	sellingPrice: number,
) => {
	const { billingDuration, billingIncrement, price } = installment

	if (!billingDuration || !billingIncrement) {
		return ''
	}

	const withTaxes = sellingPrice < price

	return `ou até ${billingDuration}x de R$ ${billingIncrement} ${withTaxes ? 'com juros' : 'sem juros'}`
}

export const useOffer = (aggregateOffer?: AggregateOffer) => {
	const offer = aggregateOffer?.offers[0]
	const listPrice = offer?.priceSpecification.find((spec) =>
		spec.priceType === 'https://schema.org/ListPrice'
	)
	const installment = offer?.priceSpecification.reduce(bestInstallment, null)
	const seller = offer?.seller
	const price = offer?.price

	const difference = (listPrice?.price ?? 1) - (price ?? 1)
	const discount = Math.round((difference / (listPrice?.price ?? 1)) * 100)

	return {
		price,
		listPrice: listPrice?.price,
		discount,
		seller,
		installments: installment && price ? installmentToString(installment) : null,
		fullInstallments: installment && price ? fullInstallmentToString(installment, price) : null,
	}
}
