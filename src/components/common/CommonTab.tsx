import { Activity, useState } from "react";
import type { TabsProps } from "../../types/CommomType";

const CommonTab = <T,>({ tabs, moduleConfig }: TabsProps<T>) => {
    
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

    const activeTabConfig = tabs.find(t => t.id === activeTab);
    const ActiveComponent = activeTabConfig?.component;

    if (!ActiveComponent) {
        return <div>No active tab component found</div>;
    }

    // Pass specific config based on active tab
    const componentProps = activeTab === 'list'
        ? { table: moduleConfig.table }
        : activeTab === 'create'
            ? { form: moduleConfig.form }
            : {};

    return (
        <>
            {/* Tab Buttons */}
            <div className="flex gap-4 border-b mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-2 px-4 ${activeTab === tab.id
                                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <Activity>
                <ActiveComponent {...componentProps} />
            </Activity>

        </>
    );
}
export default CommonTab;