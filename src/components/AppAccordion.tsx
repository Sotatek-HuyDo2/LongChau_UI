import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import 'src/styles/components/AppAccordion.scss';

interface IAppAccordion {
  index: number;
  title: string;
  description: string;
}

const AppAccordion = (props: IAppAccordion) => {
  const { index, title, description } = props;
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);

  const onClickAccordion = () => setOpenAccordion(!openAccordion);
  return (
    <Accordion allowMultiple className="main-accordion">
      <AccordionItem
        background={openAccordion ? '' : 'rgba(33, 35, 47, 0.5)'}
        mb={'20px'}
      >
        <>
          <h2>
            <AccordionButton onClick={onClickAccordion}>
              <Box as="span" flex="1" textAlign="left">
                {index}. {title}
              </Box>
              {openAccordion ? (
                <AddIcon fontSize="12px" color={'#6C7080'} />
              ) : (
                <MinusIcon fontSize="12px" color={'#6C7080'} />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel className="description" color={'#A4A7B7'} pb={4}>
            {description}
          </AccordionPanel>
        </>
      </AccordionItem>
    </Accordion>
  );
};

export default AppAccordion;
