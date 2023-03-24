import { Link } from '@inertiajs/react';
import React from 'react'
import PrimaryButton from './PrimaryButton';

export default function Paginate({ contents }) {
    console.log(contents);
    const links = contents.links
    const paginate_show = 3
    const numberLinks = links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous');
    return (contents.last_page === 1 ? <></> :
        <div className={`grid grid-cols-3 md:flex md:justify-end`}>
            {contents.prev_page_url == null ? <></> : <Link href={contents.prev_page_url} className={`col-span-3 md:col-span-1 m-2`}><PrimaryButton className={`w-full flex justify-center`}>Sebelumnya</PrimaryButton></Link>}
            {contents.current_page >= 2 ? <Link href={contents.path}><PrimaryButton className='m-2'>1</PrimaryButton></Link> : <></>}
            {links.length > 2 ? contents.current_page > 2 ? <PrimaryButton className={`m-2 w-fit`} disabled={true}>{`...`}</PrimaryButton> : <></> : <></>}
            {contents.data > 0 ? <></> : numberLinks.slice(contents.current_page - 1, contents.current_page + 1).map((item, index) => {
                return (
                    <Link href={item.url}>
                        <PrimaryButton key={index} disabled={item.active} className={`m-2`}>
                            {item.label}
                        </PrimaryButton>
                    </Link>
                )
            })}
            {links.length > (paginate_show + 1) ? contents.current_page < (contents.last_page - 2) ? <PrimaryButton className={`m-2 w-fit`} disabled={true}>{`...`}</PrimaryButton> : <></> : <></>}
            {links.length > paginate_show ? contents.current_page === contents.last_page ? <></> : contents.last_page - 2 >= contents.current_page ? <Link href={contents.last_page_url}><PrimaryButton className={`m-2`}>{contents.last_page}</PrimaryButton></Link> : <></> : <></>}
            {contents.next_page_url == null ? <></> : <Link href={contents.next_page_url} className={`col-span-3 md:col-span-1 m-2`}><PrimaryButton className={`w-full flex justify-center`}>Selanjutnya</PrimaryButton></Link>}
        </div>
    )
}
