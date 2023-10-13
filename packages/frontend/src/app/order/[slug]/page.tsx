// @todo fill the page with the basic order information
export default function Page({ params }: { params: { slug: string } }) {
    return <div>Order number: {params.slug}</div>
}
  