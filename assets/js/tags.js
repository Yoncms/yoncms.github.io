document.addEventListener('DOMContentLoaded', function() {
  // 获取所有标签链接
  const tagLinks = document.querySelectorAll('.tag-link');
  const tagSections = document.querySelectorAll('.tag-section');
  
  // 处理标签点击
  function handleTagClick(tagId) {
    tagSections.forEach(section => {
      if (section.id === tagId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

  // 为每个标签链接添加点击事件
  tagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const tagId = this.getAttribute('data-tag');
      handleTagClick(tagId);
      // 更新URL hash
      window.location.hash = tagId;
    });
  });

  // 检查URL hash并处理
  const hash = window.location.hash;
  if (hash) {
    const tagId = hash.substring(1);
    handleTagClick(tagId);
  }
}); 