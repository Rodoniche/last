import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const TaskDetailsModal = ({ isOpen, onClose, task, onSave }) => {
  const [note, setNote] = useState(task.note || '');
  const [deadline, setDeadline] = useState(task.deadline || '');
  const [location, setLocation] = useState(task.location || '');
  const [tags, setTags] = useState(task.tags || []);
  const [newTag, setNewTag] = useState('');
  const [reminder, setReminder] = useState(task.reminder || '');
  const [markdown, setMarkdown] = useState(task.markdown || '');
  const toast = useToast();

  const handleSave = () => {
    const updatedTask = {
      ...task,
      note,
      deadline,
      location,
      tags,
      reminder,
      markdown,
    };
    onSave(updatedTask);
    onClose();
    toast({
      title: 'Успешно',
      description: 'Детали задачи сохранены',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Детали задачи</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Примечание</FormLabel>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Введите примечание"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Дедлайн</FormLabel>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Место</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Введите место"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Теги</FormLabel>
              <HStack spacing={2}>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Введите тег"
                />
                <IconButton
                  icon={<FaPlus />}
                  onClick={handleAddTag}
                  aria-label="Добавить тег"
                />
              </HStack>
              <HStack mt={2} spacing={2}>
                {tags.map((tag, index) => (
                  <Tag key={index} size="md" colorScheme="blue">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Напомнить через</FormLabel>
              <Input
                type="time"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Markdown</FormLabel>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Введите текст в формате Markdown"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Сохранить
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetailsModal;