import React from "react";
import { ContentWrapper, Headers, Modal, UnitForm } from "../molecules";
import clsx from "clsx";
import { Button, Heading, Input } from "../atoms";
import { IoAdd, IoSearch } from "react-icons/io5";
import { useToggle } from "../../hooks";

const DataUnitContainer: React.FC = () => {
  const [isOpen, toggle] = useToggle();
  return (
    <>
      <ContentWrapper>
        <Headers headerTitle="Unit" description="Leadtime & Paint" className="col-span-full" />
        <div className={clsx("col-span-full h-96 rounded-lg bg-white px-8 py-6 shadow-lg")}>
          <div className="flex h-fit items-center gap-4">
            <Heading className="grow text-lg font-semibold">Data Unit Table</Heading>
            <Input
              type="text"
              placeholder="Search Work Order"
              renderElement={<IoSearch className="absolute right-5" />}
            />
            <Button
              icon={IoAdd}
              onClick={() => toggle()}
              className={clsx("border-[1.6px] border-gray-300 bg-gray-50 p-3 text-sm")}
            >
              Add New Data
            </Button>
          </div>
        </div>
        <Modal isOpen={isOpen} onToggle={() => toggle()} modalTitle="Input Data Unit">
          <UnitForm />
        </Modal>
      </ContentWrapper>
    </>
  );
};

export default DataUnitContainer;
