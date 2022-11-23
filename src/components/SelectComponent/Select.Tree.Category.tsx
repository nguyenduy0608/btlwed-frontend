import AxiosClient from '@/apis/AxiosClient';
import useDebounce from '@/hooks/useDebounce';
import { Tree, TreeSelect } from 'antd';
import React from 'react';

const SelectTreeCategory = ({ placeholder, onChange }: { placeholder: string; onChange: any }) => {
    const [search, setSearch] = React.useState('');
    const debouncedSearchTerm = useDebounce(search, 300);

    const treeSelectRef: any = React.useRef(null);

    const [valueSelected, setValueSelected] = React.useState<any>('');
    const [treeValueSelected, setTreeValueSelected] = React.useState<any>(undefined);

    const [loading, setLoading] = React.useState(false);

    const [categories, setCategories] = React.useState<any>([]);

    React.useEffect(() => {
        setLoading(true);
        AxiosClient(`/admin/product_category`, { params: { search: debouncedSearchTerm, limit: 15 } })
            .then((res) => {
                const data = res.data.map((item: any) => ({
                    title: item.name,
                    value: item.id,
                    key: item.id,
                    children: item.listChild.map((child: any) => ({
                        title: child.name,
                        value: child.id,
                        key: child.id,
                    })),
                }));
                setCategories(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [debouncedSearchTerm]);

    const onSelect = (newValue: any, { node }: any) => {
        setTreeValueSelected(node.title);
        treeSelectRef?.current?.blur();
        setValueSelected(newValue);
        onChange(newValue?.[0] || '');
    };

    const handleClearSelect = () => {
        setValueSelected('');
        onChange('');
        setTreeValueSelected(undefined);
        setSearch('');
    };

    return (
        <TreeSelect
            loading={loading}
            value={treeValueSelected}
            ref={treeSelectRef}
            dropdownRender={() => {
                return <Tree selectedKeys={valueSelected} onSelect={onSelect} defaultExpandAll treeData={categories} />;
            }}
            style={{ minWidth: '300px' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder={placeholder}
            allowClear
            showSearch
            onClear={handleClearSelect}
            onSearch={(value) => value && setSearch(value)}
        />
    );
};

export default SelectTreeCategory;
