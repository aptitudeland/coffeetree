class Extraction < ApplicationRecord

  before_create :update_coffee_weight_left

  belongs_to :user
  belongs_to :user_coffee
  has_and_belongs_to_many :accessories
  belongs_to :brewing_method, class_name: 'Accessory', foreign_key: 'brewing_method_id'
  has_many :tastings

  validates :brewing_method, presence: { message: 'must be associated with a brewing method' }
  validates :user_coffee, presence: true
  validates :user, presence: true

  attr_accessor :grinder_id

  private

  def update_coffee_weight_left
    self.user_coffee.update_weight_left(self.weight_in)
  end
end
