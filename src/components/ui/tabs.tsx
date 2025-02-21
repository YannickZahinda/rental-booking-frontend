import { createContext, ReactNode, useContext, useState } from "react";
import clsx from "clsx";

interface TabsConTextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

interface TabListProps {
  children: ReactNode;
}

interface TabListTriggerProps {
    value: string;
    children: ReactNode;
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

const TabsContext = createContext<TabsConTextType | undefined>(undefined);

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={clsx("space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: TabListProps) {
  return <div className="flex border-b space-x-2 pb-2">{children}</div>;
}

export function TabsTrigger({ value, children }: TabListTriggerProps) {
    const context = useContext(TabsContext);
    if(!context) {
        throw new Error("TabsTrigger must be used within a <Tabs> component");
    }
    const { activeTab, setActiveTab } = context;
  
    return (
      <button
        className={clsx(
          "px-4 py-2 rounded-t-md focus:outline-none",
          activeTab === value ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-gray-700"
        )}
        onClick={() => setActiveTab(value)}
      >
        {children}
      </button>
    );
  }
  
  export function TabsContent({ value, children }: TabsContentProps) {
    const context = useContext(TabsContext);

    if(!context){
        throw new Error("TabContent must be used with <Tabs> component ");
    }

    const { activeTab } = context;
    return activeTab === value ? <div className="p-4 border rounded-md">{children}</div> : null;
  }
