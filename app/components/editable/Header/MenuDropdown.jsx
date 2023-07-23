'use client'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Link from 'next/link';

export default function MenuDropdown(props) {

    const galleries = props.galleries

    const formatGalleryName = (gallery) => {
        return gallery
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <DropdownButton variant="none" title="Galleries">
            {galleries.map((gallery) => (
                <Dropdown.Item key={gallery} href={`/gallery/${gallery}`}>
                    {formatGalleryName(gallery)}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    )
}